import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
  boolean,
  date,
  json,
  decimal,
} from "drizzle-orm/pg-core";

// --- 1. USERS & AUTH ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- 2. DATA RELAWAN (Volunteers) ---
export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  registrationId: varchar("registration_id", { length: 50 }).unique(), // REG-646058
  submissionDate: text("submission_date"),
  fullName: text("full_name"),
  nim: varchar("nim", { length: 50 }),
  institution: text("institution"),
  faculty: text("faculty"),
  semester: integer("semester"),
  whatsapp: varchar("whatsapp", { length: 50 }),
  email: varchar("email", { length: 100 }),
  statementFile: text("statement_file"),
  status: varchar("status", { length: 50 }).default("MENUNGGU SELEKSI"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- 3. DATA MAHASISWA (Master Data) ---
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  nim: varchar("nim", { length: 50 }).unique(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- 4. DATA TER & RIWAYAT TER (Pajak) ---
export const terData = pgTable("ter_data", {
  id: serial("id").primaryKey(),
  terId: varchar("ter_id", { length: 50 }), // TER-163041
  timestamp: text("timestamp"),
  employeeName: text("employee_name"),
  nik: varchar("nik", { length: 50 }),
  ptkpStatus: varchar("ptkp_status", { length: 20 }), // TK/0 (TER A)
  grossIncome: decimal("gross_income", { precision: 18, scale: 2 }),
  taxAmount: decimal("tax_amount", { precision: 18, scale: 2 }),
  terRate: decimal("ter_rate", { precision: 5, scale: 4 }), // 0.1
});

export const terHistory = pgTable("ter_history", {
  id: serial("id").primaryKey(),
  logId: varchar("log_id", { length: 50 }),
  calculationDate: text("calculation_date"),
  employeeName: text("employee_name"),
  nik: varchar("nik", { length: 50 }),
  ptkpStatus: varchar("ptkp_status", { length: 20 }),
  grossIncome: decimal("gross_income", { precision: 18, scale: 2 }),
  terRate: decimal("ter_rate", { precision: 5, scale: 4 }),
  taxPayable: decimal("tax_payable", { precision: 18, scale: 2 }),
});

// --- 5. DATA PAJAK (SPT, BPPU, BP21, Billing) ---
export const sptData = pgTable("spt_data", {
  id: serial("id").primaryKey(),
  sptId: varchar("spt_id", { length: 50 }).unique(),
  taxType: varchar("tax_type", { length: 50 }), // PPh Pasal 21
  taxPeriod: varchar("tax_period", { length: 20 }), // Januari
  taxYear: integer("tax_year"),
  status: varchar("status", { length: 50 }),
  correction: integer("correction").default(0),
  createdAt: text("created_at"),
  taxUnderpayment: decimal("tax_underpayment", { precision: 18, scale: 2 }),
  jsonData: text("json_data"), // Menyimpan payload JSON mentah
});

export const bppuData = pgTable("bppu_data", {
  id: serial("id").primaryKey(),
  bppuId: varchar("bppu_id", { length: 50 }),
  taxPeriod: text("tax_period"),
  status: varchar("status", { length: 50 }),
  npwpNik: varchar("npwp_nik", { length: 50 }),
  taxpayerName: text("taxpayer_name"),
  objectCode: varchar("object_code", { length: 20 }),
  taxBase: decimal("tax_base", { precision: 18, scale: 2 }),
  rate: decimal("rate", { precision: 5, scale: 2 }),
  taxCut: decimal("tax_cut", { precision: 18, scale: 2 }),
  docNumber: text("doc_number"),
  inputDate: text("input_date"),
});

export const bp21Data = pgTable("bp21_data", {
  id: serial("id").primaryKey(),
  bupotId: varchar("bupot_id", { length: 50 }),
  taxPeriod: text("tax_period"),
  status: varchar("status", { length: 50 }),
  receiverNpwp: varchar("receiver_npwp", { length: 50 }),
  receiverName: text("receiver_name"),
  objectCode: varchar("object_code", { length: 20 }),
  grossAmount: decimal("gross_amount", { precision: 18, scale: 2 }),
  dpp: decimal("dpp", { precision: 18, scale: 2 }),
  rate: decimal("rate", { precision: 5, scale: 4 }),
  taxAmount: decimal("tax_amount", { precision: 18, scale: 2 }),
  docNumber: text("doc_number"),
  inputDate: text("input_date"),
});

export const billingData = pgTable("billing_data", {
  id: serial("id").primaryKey(),
  billingId: varchar("billing_id", { length: 50 }),
  npwp: varchar("npwp", { length: 50 }),
  taxpayerName: text("taxpayer_name"),
  billingCode: varchar("billing_code", { length: 20 }),
  taxMonth: varchar("tax_month", { length: 20 }), // Januari
  taxYear: integer("tax_year"),
  amount: decimal("amount", { precision: 18, scale: 2 }),
  status: varchar("status", { length: 50 }),
  ntpn: varchar("ntpn", { length: 50 }),
  paidAt: text("paid_at"),
  createdAt: text("created_at"),
});

// --- 6. UJIAN & SELEKSI ---
export const questionBank = pgTable("question_bank", {
  id: serial("id").primaryKey(),
  question: text("question"),
  optionA: text("option_a"),
  optionB: text("option_b"),
  optionC: text("option_c"),
  optionD: text("option_d"),
  correctAnswer: varchar("correct_answer", { length: 5 }), // A, B, C, D
  category: varchar("category", { length: 20 }).default("standard"), // standard / competition
});

export const selectionResults = pgTable("selection_results", {
  id: serial("id").primaryKey(),
  timestamp: text("timestamp"),
  participantIdentity: text("participant_identity"),
  finalScore: integer("final_score"),
  status: varchar("status", { length: 50 }), // LULUS / TIDAK LULUS
  violations: integer("violations").default(0),
  notes: text("notes"),
});

export const competitionResults = pgTable("competition_results", {
  id: serial("id").primaryKey(),
  timestamp: text("timestamp"),
  participantName: text("participant_name"),
  nim: varchar("nim", { length: 50 }),
  finalScore: integer("final_score"),
  violations: integer("violations"),
  status: varchar("status", { length: 50 }),
});
