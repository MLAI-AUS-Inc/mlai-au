// Notion API Script to Remove Duplicate Events by Event Link URL
// You'll need to install @notionhq/client: npm install @notionhq/client

const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY, // Replace with your integration token
});

async function findLumaEventsDatabase() {
  try {
    const searchResponse = await notion.search({
      query: "Luma Events Database",
      filter: {
        value: "database",
        property: "object",
      },
    });

    if (searchResponse.results && searchResponse.results.length > 0) {
      console.log("Found Luma Events database:", searchResponse.results[0].id);
      return searchResponse.results[0].id;
    }

    console.log("No Luma Events database found");
    return null;
  } catch (error) {
    console.error("Error finding database:", error);
    return null;
  }
}

async function removeDuplicateEvents() {
  try {
    console.log("🔍 Looking for Luma Events database...");
    const databaseId = await findLumaEventsDatabase();

    if (!databaseId) {
      console.log("❌ No Luma Events database found");
      return;
    }

    console.log("📊 Querying all events from database...");
    
    // Get all events from the database
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log(`📋 Found ${response.results.length} total events`);

    // Group events by Event Link URL to find duplicates
    const eventsByUrl = new Map();
    
    for (const page of response.results) {
      try {
        const eventName = page.properties["Event Name"]?.title?.[0]?.text?.content || "Unnamed Event";
        const eventLink = page.properties["Event Link"]?.url || "";
        
        if (!eventLink) {
          console.log(`⚠️  Skipping event "${eventName}" - no Event Link`);
          continue;
        }

        if (!eventsByUrl.has(eventLink)) {
          eventsByUrl.set(eventLink, []);
        }
        
        eventsByUrl.get(eventLink).push({
          id: page.id,
          name: eventName,
          url: eventLink,
          created: page.created_time
        });
      } catch (error) {
        console.error(`❌ Error processing page ${page.id}:`, error);
      }
    }

    // Find duplicates (URLs with more than one event)
    const duplicateGroups = [];
    const uniqueEvents = [];
    
    for (const [url, events] of eventsByUrl) {
      if (events.length > 1) {
        // Sort by creation time, keep the oldest one
        events.sort((a, b) => new Date(a.created) - new Date(b.created));
        const keepEvent = events[0];
        const duplicateEvents = events.slice(1);
        
        duplicateGroups.push({
          url,
          keep: keepEvent,
          duplicates: duplicateEvents
        });
      } else {
        uniqueEvents.push(events[0]);
      }
    }

    console.log(`✅ Unique events: ${uniqueEvents.length}`);
    console.log(`🔗 Duplicate groups found: ${duplicateGroups.length}`);
    
    let totalDuplicatesToDelete = 0;
    duplicateGroups.forEach(group => {
      totalDuplicatesToDelete += group.duplicates.length;
    });
    
    console.log(`🗑️  Total duplicate events to delete: ${totalDuplicatesToDelete}`);

    if (duplicateGroups.length === 0) {
      console.log("✨ No duplicates found! Your database is already clean.");
      return;
    }

    console.log("\n📝 Duplicate groups:");
    duplicateGroups.forEach((group, index) => {
      console.log(`\n${index + 1}. URL: ${group.url}`);
      console.log(`   ✅ KEEPING: "${group.keep.name}" (created: ${group.keep.created})`);
      group.duplicates.forEach((dup, dupIndex) => {
        console.log(`   ❌ DELETE: "${dup.name}" (created: ${dup.created})`);
      });
    });

    console.log(`\n⚠️  WARNING: This will delete ${totalDuplicatesToDelete} duplicate events!`);
    console.log("🔄 Starting deletion process...");

    // Delete duplicates
    const deletePromises = [];
    
    duplicateGroups.forEach(group => {
      group.duplicates.forEach(duplicate => {
        deletePromises.push(
          notion.pages.update({
            page_id: duplicate.id,
            archived: true, // Archive instead of permanently delete
          }).then(() => {
            console.log(`✅ Deleted duplicate: "${duplicate.name}"`);
            return { success: true, event: duplicate };
          }).catch(error => {
            console.error(`❌ Failed to delete "${duplicate.name}":`, error);
            return { success: false, event: duplicate, error };
          })
        );
      });
    });

    const results = await Promise.allSettled(deletePromises);
    
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = results.filter(result => 
      result.status === 'rejected' || 
      (result.status === 'fulfilled' && !result.value.success)
    ).length;

    console.log(`\n📊 Cleanup Summary:`);
    console.log(`  ✅ Successfully deleted: ${successful}`);
    console.log(`  ❌ Failed to delete: ${failed}`);
    console.log(`  📝 Unique events remaining: ${uniqueEvents.length + duplicateGroups.length}`);
    console.log(`  🔗 Total events after cleanup: ${response.results.length - successful}`);

    console.log("\n🎉 Duplicate cleanup completed!");

  } catch (error) {
    console.error("❌ Error during duplicate cleanup:", error);
    throw error;
  }
}

// Run the function
removeDuplicateEvents()
  .then(() => {
    console.log("\n✨ Duplicate removal script completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Duplicate removal script failed:", error.message);
    process.exit(1);
  });