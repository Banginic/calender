import { DAYS_OF_THE_WEEK_IN_ORDER } from "@/constants";
import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, boolean, index, timestamp, pgEnum } from "drizzle-orm/pg-core";


const createdAt = timestamp('createdAt').notNull().defaultNow()
const updatedAt = timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date())


// Define the 'events' table
export const eventTable = pgTable(
    'events', {
        id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
        name: varchar('name').notNull(),
        description: varchar('description'),
        durationInMinutes: integer('durartionInMinutes').notNull(),
        clerkUserId: varchar('clerkUserId').notNull(),
        isActive: boolean('isActive').notNull().default(true),
        createdAt, updatedAt
    },
    table => ([
        index("clerkUserIdIndex").on(table.clerkUserId)
    ])
)

// Define the 'schedule table, one per user with timezone and timestamps
export const scheduleTable = pgTable( 'schedules', {
     id: integer().primaryKey().generatedAlwaysAsIdentity(),
     timezone: varchar('timezone').notNull(),
     clerkUserId: varchar('clerkUserId').notNull().unique(),
     createdAt, updatedAt
})

//Define relation for the scheduleTable: a schedule has many availabilties
export const scheduleRelations = relations(scheduleTable, ({ many }) => ({
    availabilities: many(scheduleAvailabilityTabale)
}))

// Define postgreSQL ENUM  for the days of the week
export const scheduleDayOfWeekEnum = pgEnum('day', DAYS_OF_THE_WEEK_IN_ORDER)


//Define the 'schedule availabilites' table, which stores available time slots per day
export const scheduleAvailabilityTabale = pgTable(
    'scheduleAvailabilities',
    {
          id: integer().primaryKey().generatedAlwaysAsIdentity(),
          scheduleId: integer('scheduleId').notNull().references(() => scheduleTable.id, { onDelete: 'cascade'}),
          startTime: varchar('startTime').notNull(),
          endTime: varchar('endTime').notNull(),
          dayOfWeek: scheduleDayOfWeekEnum('dayOfWeek').notNull()
    },
    table => ([
        index('scheduleIdIndex').on(table.scheduleId)
    ])
)

// Define the reverse relation: each availability belongs to a schedule
export const scheduleAvailabilityRelations = relations(
    scheduleAvailabilityTabale,
    ({ one }) => (
        { schedule :one(scheduleTable, {
            fields: [ scheduleAvailabilityTabale.scheduleId],
            references: [ scheduleTable.id]
        }),  }
    )
)