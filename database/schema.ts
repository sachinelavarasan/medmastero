
import { pgTable, serial, text, varchar , smallint, integer } from 'drizzle-orm/pg-core';

export const gender = pgTable("gender", {
  gen_id: serial("gen_id").primaryKey(),
  gen_name: text("gen_name"),
});

export const userType = pgTable("user_type", {
  ut_id: serial("ut_id").primaryKey(),
  ut_name: text("ut_name"),
});

export const user = pgTable('user', {
  us_id: serial('us_id').primaryKey(),
  us_fullname: text('us_fullname'),
  us_phone_number: varchar('us_phone_number', { length: 100 }),
  us_email: varchar('us_email', { length: 256 }),
  us_gender: integer('us_gender').references(() => gender.gen_id),
  us_address: varchar('us_address', { length: 256 }),
  us_district: varchar('us_district', { length: 150 }),
  us_state: varchar('us_state', { length: 150 }),
  us_country: varchar('us_country', { length: 150 }),
  us_pincode: varchar('us_pincode', { length: 100 }),
  us_username: text('us_username'),
  us_is_active: smallint('us_is_active').default(0),  
  us_is_deleted:smallint('us_is_deleted').default(0),  
  us_type: integer("us_type").references(() => userType.ut_id),
  us_verification_code: varchar("us_verification_code"),
});

export const shop = pgTable("shop", {
  sh_id: serial("sh_id").primaryKey(),
  sh_name: text("sh_name"),
  sh_gst_number: varchar('sh_gst_number', { length: 200 })
});

export const branch = pgTable('branch', {
  br_id: serial('br_id').primaryKey(),
  br_shop_id: integer('br_shop_id').references(() => shop.sh_id),
  br_fullname: text('br_fullname'),
  br_phone_number: varchar('br_phone_number', { length: 100 }),
  br_email: varchar('br_email', { length: 256 }),
  br_address: varchar('br_address', { length: 256 }),
  br_district: varchar('br_district', { length: 150 }),
  br_state: varchar('br_state', { length: 150 }),
  br_country: varchar('br_country', { length: 150 }),
  br_pincode: varchar('br_pincode', { length: 100 }),
  br_location: varchar('br_location', { length: 256 }),
  br_website_link:  varchar('br_website_link', { length: 256 }),
  br_is_active: smallint('br_is_active').default(0),  
  br_is_deleted:smallint('br_is_deleted').default(0),  
  br_admin: integer("br_admin").references(() => user.us_id)
});
