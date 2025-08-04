// Notion API Script to Delete Events Without Required API ID
// You'll need to install @notionhq/client: npm install @notionhq/client

const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY, // Replace with your integration token
});

const REQUIRED_CALENDAR_API_ID = "cal-KPakbH2wTxQuyCj";

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

async function deleteInvalidEvents() {
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

    // Filter events that should be deleted
    const eventsToDelete = [];
    const validEvents = [];

    for (const page of response.results) {
      try {
        // Get the Calendar API ID from the page properties
        const calendarApiIdProperty = page.properties["Calendar API ID"];
        let calendarApiId = "";
        
        if (calendarApiIdProperty && calendarApiIdProperty.rich_text && calendarApiIdProperty.rich_text.length > 0) {
          calendarApiId = calendarApiIdProperty.rich_text[0].text.content;
        }

        const eventName = page.properties["Event Name"]?.title?.[0]?.text?.content || "Unnamed Event";

        if (calendarApiId !== REQUIRED_CALENDAR_API_ID) {
          eventsToDelete.push({
            id: page.id,
            name: eventName,
            calendarApiId: calendarApiId || "(empty)",
          });
        } else {
          validEvents.push({
            id: page.id,
            name: eventName,
            calendarApiId: calendarApiId,
          });
        }
      } catch (error) {
        console.error(`❌ Error processing page ${page.id}:`, error);
      }
    }

    console.log(`✅ Valid events (with calendar_api_id "${REQUIRED_CALENDAR_API_ID}"): ${validEvents.length}`);
    console.log(`🗑️  Events to delete (without required calendar_api_id): ${eventsToDelete.length}`);

    if (eventsToDelete.length === 0) {
      console.log("✨ No invalid events found. All events have the required Calendar API ID!");
      return;
    }

    console.log("\n📝 Events that will be deleted:");
    eventsToDelete.forEach((event, index) => {
      console.log(`  ${index + 1}. "${event.name}" (Calendar API ID: ${event.calendarApiId})`);
    });

    console.log(`\n⚠️  WARNING: This will delete ${eventsToDelete.length} events!`);
    console.log("🔄 Starting deletion process...");

    // Delete each invalid event
    const deletePromises = eventsToDelete.map(async (event, index) => {
      try {
        await notion.pages.update({
          page_id: event.id,
          archived: true, // Archive instead of permanently delete
        });
        
        console.log(`✅ Deleted ${index + 1}/${eventsToDelete.length}: "${event.name}"`);
        return { success: true, event };
      } catch (error) {
        console.error(`❌ Failed to delete "${event.name}":`, error);
        return { success: false, event, error };
      }
    });

    const results = await Promise.allSettled(deletePromises);
    
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = results.filter(result => 
      result.status === 'rejected' || 
      (result.status === 'fulfilled' && !result.value.success)
    ).length;

    console.log(`\n📊 Deletion Summary:`);
    console.log(`  ✅ Successfully deleted: ${successful}`);
    console.log(`  ❌ Failed to delete: ${failed}`);
    console.log(`  📝 Valid events remaining: ${validEvents.length}`);

    if (validEvents.length > 0) {
      console.log("\n📋 Valid events remaining in database:");
      validEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. "${event.name}"`);
      });
    }

    console.log("\n🎉 Cleanup completed!");

  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    throw error;
  }
}

// Run the function
deleteInvalidEvents()
  .then(() => {
    console.log("\n✨ Cleanup script completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Cleanup script failed:", error.message);
    process.exit(1);
  });