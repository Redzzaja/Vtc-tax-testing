import { getSheetData } from "@/lib/google";

export default async function DashboardPage() {
  // Kita coba ambil data ringkasan sederhana dari Sheet "Riwayat TER"
  // Sesuai logika getTaxSummary di backend.gs
  const terData = await getSheetData("Riwayat TER!A2:H");

  const totalHitung = terData.length;
  // Hitung total pajak (kolom H / index 7)
  const totalPajak = terData.reduce((acc, row) => {
    const val = parseFloat(row[7]) || 0;
    return acc + val;
  }, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Ringkasan Sistem
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Simulasi TER</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {totalHitung}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Kali perhitungan dilakukan
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Potensi PPh 21</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            Rp {totalPajak.toLocaleString("id-ID")}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Total nominal terhitung</p>
        </div>

        {/* Card 3 (Placeholder) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Status Server</p>
          <h3 className="text-3xl font-bold text-purple-600 mt-2">Online</h3>
          <p className="text-xs text-gray-400 mt-1">Next.js App Router</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-800 mb-2">💡 Info Update 2025</h3>
        <p className="text-blue-700 text-sm">
          Sistem ini telah menggunakan tarif{" "}
          <strong>TER (Tarif Efektif Rata-rata)</strong> sesuai PP 58/2023 dan
          tarif PPN 12% (efektif Jan 2025). Data terintegrasi langsung dengan
          Google Sheets.
        </p>
      </div>
    </div>
  );
}
