// Notion API Script to Create Events Database
// You'll need to install @notionhq/client: npm install @notionhq/client

const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: "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", // Replace with your integration token
});

async function createEventsDatabase() {
  try {
    // Create the database
    const database = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: "2449c67419c8808c9435fa0bf3b70e1c", // Replace with your parent page ID
      },
      title: [
        {
          type: "text",
          text: {
            content: "Luma Events Database",
          },
        },
      ],
      properties: {
        "Event Name": {
          title: {},
        },
        "Cover Image URL": {
          url: {},
        },
        Date: {
          date: {},
        },
        "Event Image": {
          files: {},
        },
        "Event Link": {
          url: {},
        },
        "Event Type": {
          select: {
            options: [
              {
                name: "Co-working",
                color: "blue",
              },
              {
                name: "AI Community",
                color: "purple",
              },
              {
                name: "Networking",
                color: "green",
              },
              {
                name: "Conference",
                color: "orange",
              },
            ],
          },
        },
        Location: {
          rich_text: {},
        },
        "Registration Status": {
          select: {
            options: [
              {
                name: "Open",
                color: "green",
              },
              {
                name: "Closed",
                color: "red",
              },
              {
                name: "Past Event",
                color: "gray",
              },
              {
                name: "Request to Join",
                color: "yellow",
              },
            ],
          },
        },
        Time: {
          rich_text: {},
        },
        "Calendar API ID": {
          rich_text: {},
        },
      },
    });

    console.log("✅ Database created successfully!");
    console.log("📊 Database ID:", database.id);
    console.log("🔗 Database URL:", database.url);

    // Add a sample event entry
    const page = await notion.pages.create({
      parent: {
        database_id: database.id,
      },
      properties: {
        "Event Name": {
          title: [
            {
              text: {
                content:
                  "Melbourne | StartSpace x Build Club & MLAI Monthly Saturday Co-working Day",
              },
            },
          ],
        },
        "Cover Image URL": {
          url: "https://images.lumacdn.com/event-covers/5o/7e85b506-6e59-43b4-beeb-20c34f84a4c2",
        },
        Date: {
          date: {
            start: "2025-08-02",
            end: "2025-08-02",
          },
        },
        "Event Image": {
          files: [
            {
              name: "Event Cover",
              external: {
                url: "https://images.lumacdn.com/event-covers/5o/7e85b506-6e59-43b4-beeb-20c34f84a4c2",
              },
            },
          ],
        },
        "Event Link": {
          url: "https://lu.ma/1hvzqyhd",
        },
        "Event Type": {
          select: {
            name: "AI Community",
          },
        },
        Location: {
          rich_text: [
            {
              text: {
                content: "State Library Victoria, Melbourne, Victoria",
              },
            },
          ],
        },
        "Registration Status": {
          select: {
            name: "Past Event",
          },
        },
        Time: {
          rich_text: [
            {
              text: {
                content: "10:00 AM - 12:30 PM AEST",
              },
            },
          ],
        },
        "Calendar API ID": {
          rich_text: [
            {
              text: {
                content: "cal-KPakbH2wTxQuyCj",
              },
            },
          ],
        },
      },
    });

    console.log("✅ Sample event entry created successfully!");
    console.log("📄 Page ID:", page.id);

    console.log(
      "\n🎉 Setup complete! Your database is ready for the Luma Events import."
    );

    return {
      databaseId: database.id,
      pageId: page.id,
    };
  } catch (error) {
    console.error("❌ Error creating database:", error);
    throw error;
  }
}

// Run the function
createEventsDatabase()
  .then((result) => {
    console.log("\n✨ Success! Database setup completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Setup failed:", error.message);
    process.exit(1);
  });
