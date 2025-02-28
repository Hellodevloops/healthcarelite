"use client";

import React, { useEffect, useState } from "react";
import { patientService } from "@/components/services/patientService";

export default function DashboardFilters() {
  const [stats, setStats] = useState({
    totalCollection: 0,
    patientCount: 0,
    period: "daily",
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await patientService.getStats(stats.period);
      setStats(data);
    };
    fetchStats();
  }, [stats.period]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard Stats</h2>
      <div className="space-x-4 mb-4">
        <button
          onClick={() => setStats({ ...stats, period: "daily" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Daily
        </button>
        <button
          onClick={() => setStats({ ...stats, period: "weekly" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Weekly
        </button>
        <button
          onClick={() => setStats({ ...stats, period: "monthly" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Monthly
        </button>
        <button
          onClick={() => setStats({ ...stats, period: "yearly" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Yearly
        </button>
      </div>
      <p>Total Collection: ${stats.totalCollection.toFixed(2)}</p>
      <p>Number of Patients: {stats.patientCount}</p>
    </div>
  );
}