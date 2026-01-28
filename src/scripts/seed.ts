import { db } from "../db/index";
import * as schema from "../db/schema";

async function main() {
  console.log("🌱 Memulai seeding data dari VTC Dummy...");

  try {
    // 1. Seed Users
    console.log("➡️ Inserting Users...");
    await db.insert(schema.users).values([
      {
        username: "admin",
        password: "admin123",
        fullName: "Syauqal Dev",
        role: "Admin",
      },
      {
        username: "vtcbatch5",
        password: "vtc123",
        fullName: "Anggota VTC Batch 5",
        role: "Full Access",
      },
      {
        username: "relawanpajak",
        password: "relawan123",
        fullName: "Calon Relawan",
        role: "Restricted",
      },
    ]);

    // 2. Seed Volunteers (Data Relawan)
    console.log("➡️ Inserting Volunteers...");
    await db.insert(schema.volunteers).values([
      {
        registrationId: "REG-646058",
        submissionDate: "28/1/2026, 02.04.06",
        fullName: "paros",
        nim: "222229229",
        institution: "Universitas Dipo",
        faculty: "FEB",
        semester: 4,
        whatsapp: "33333",
        email: "maulanaarif@gmail.com",
        statementFile: "iieeieiqeieifnqwuifqwfw",
        status: "MENUNGGU SELEKSI",
      },
    ]);

    // 3. Seed Students (Data Mahasiswa)
    console.log("➡️ Inserting Students...");
    await db.insert(schema.students).values([
      { fullName: "Muhamad Syauqal Afwika Rahman", nim: "40011423620080" },
      { fullName: "Muhamad Naufal Afwika Rahman", nim: "40017612367123" },
    ]);

    // 4. Seed Data TER
    console.log("➡️ Inserting Data TER...");
    await db.insert(schema.terData).values([
      {
        terId: "TER-187588",
        timestamp: "28/1/2026, 01.23.07",
        employeeName: "Syauqal",
        nik: "1234123412341234",
        ptkpStatus: "TK/1 (TER A)",
        grossIncome: "2000000",
        taxAmount: "0",
        terRate: "0",
      },
      {
        terId: "TER-199910",
        timestamp: "28/1/2026, 01.23.19",
        employeeName: "Syauqal",
        nik: "1234123412341234",
        ptkpStatus: "K/1 (TER B)",
        grossIncome: "2000000",
        taxAmount: "0",
        terRate: "0",
      },
    ]);

    // 5. Seed SPT Data
    console.log("➡️ Inserting SPT Data...");
    await db.insert(schema.sptData).values([
      {
        sptId: "SPT-436280",
        taxType: "PPh Pasal 21",
        taxPeriod: "Januari",
        taxYear: 2025,
        status: "Konsep",
        createdAt: "28/1/2026, 00.37.16",
        taxUnderpayment: "0",
        jsonData:
          '{"jenis_surat":"SPT Masa PPh Pasal 21/26","source":"Next.js Coretax"}',
      },
      {
        sptId: "SPT-808307",
        taxType: "PPh Pasal 21",
        taxPeriod: "Juli",
        taxYear: 2025,
        status: "Konsep",
        createdAt: "28/1/2026, 01.00.08",
        taxUnderpayment: "0",
        jsonData:
          '{"jenis_surat":"SPT Tahunan 1770","source":"Next.js Integrated"}',
      },
    ]);

    // 6. Seed Data BP21
    console.log("➡️ Inserting BP21 Data...");
    await db.insert(schema.bp21Data).values([
      {
        bupotId: "BP-735725",
        taxPeriod: "2025-01-01",
        status: "Belum Lapor",
        receiverNpwp: "2222",
        receiverName: "3333",
        objectCode: "21-100-01",
        grossAmount: "29222193",
        dpp: "29222193",
        rate: "0.05",
        taxAmount: "1461109",
        inputDate: "28/1/2026, 02.05.35",
      },
    ]);

    // 7. Seed Billing Data
    console.log("➡️ Inserting Billing Data...");
    await db.insert(schema.billingData).values([
      {
        billingId: "BILL-918043",
        npwp: "111",
        taxpayerName: "sssss",
        billingCode: "411126",
        taxMonth: "Januari",
        taxYear: 2025,
        amount: "2222222",
        status: "Paid",
        ntpn: "841742292627934",
        paidAt: "2026-02-27",
        createdAt: "28/1/2026, 01.01.58",
      },
    ]);

    // 8. Seed Hasil Seleksi Relawan
    console.log("➡️ Inserting Selection Results...");
    await db.insert(schema.selectionResults).values([
      {
        timestamp: "28/1/2026, 11.46.31",
        participantIdentity: "Muhamad Syauqal Afwika Rahman - 40011423620080",
        finalScore: 0,
        status: "TIDAK LULUS",
        violations: 0,
        notes: "Selesai Ujian Online",
      },
    ]);

    // 9. Seed Bank Soal
    console.log("➡️ Inserting Question Bank...");
    await db.insert(schema.questionBank).values([
      {
        question: "ABC",
        optionA: "ab",
        optionB: "bc",
        optionC: "cd",
        optionD: "ef",
        correctAnswer: "A",
        category: "standard",
      },
      {
        question: "tes",
        optionA: "23",
        optionB: "35",
        optionC: "45",
        optionD: "43",
        correctAnswer: "B",
        category: "competition",
      },
      {
        question: "tes2",
        optionA: "23",
        optionB: "34",
        optionC: "45",
        optionD: "76",
        correctAnswer: "A",
        category: "competition",
      },
    ]);

    console.log("✅ Semua data berhasil di-seed!");
  } catch (error) {
    console.error("❌ Gagal seeding:", error);
  } finally {
    process.exit(0);
  }
}

main();
