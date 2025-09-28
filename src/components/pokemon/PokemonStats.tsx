import React, { useEffect, useState } from "react";
import { AiOutlineRadarChart } from "react-icons/ai";
import { FiBarChart2 } from "react-icons/fi";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar as RechartsRadar,
} from "recharts";

type Stat = {
  base_stat: number;
  stat: { name: string };
};

type PokemonStatsProps = {
  stats: Stat[];
};

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  const [viewType, setViewType] = useState<"bar" | "radar">("bar");
  const [fillWidths, setFillWidths] = useState<number[]>(stats.map(() => 0));

  // Format data untuk RadarChart
  const radarData = stats.map((s) => ({
    subject: s.stat.name.toUpperCase(),
    A: s.base_stat,
    fullMark: 200, // maksimal asumsi
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFillWidths(stats.map((s) => s.base_stat));
    }, 100); // delay kecil supaya animasi terlihat
    return () => clearTimeout(timeout);
  }, [stats]);

  useEffect(() => {
    if (viewType === "bar") {
      // Reset width ke 0 dulu
      setFillWidths(stats.map(() => 0));

      const timeout = setTimeout(() => {
        setFillWidths(stats.map((s) => s.base_stat));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [viewType, stats]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-center font-bold text-lg">Stats</h3>
        <button
          onClick={() => setViewType(viewType === "bar" ? "radar" : "bar")}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
          title={viewType === "bar" ? "Switch to Radar" : "Switch to Bar"}
        >
          {viewType === "bar" ? (
            <AiOutlineRadarChart size={20} />
          ) : (
            <FiBarChart2 size={20} />
          )}
        </button>
      </div>

      {viewType === "bar" ? (
        <div className="space-y-3 mx-auto">
          {stats.map((s, i) => (
            <div key={i}>
              <span className="block text-sm mb-1">
                {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}
              </span>
              <div className="flex items-center space-x-2">
                {/* Bar */}
                <div className="flex-1 h-3 bg-gray-300 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-3 bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(fillWidths[i] / 200) * 100}%` }} // skala 0-200
                  />
                </div>
                {/* Nilai di samping */}
                <span className="text-xs w-8 text-right">{s.base_stat}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 200]} />
              <RechartsRadar
                name="Stats"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                isAnimationActive={true}
                animationDuration={500}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PokemonStats;
