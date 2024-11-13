import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions,
    ChartData,
    TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Ensure this import is here

// Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale // Ensure TimeScale is registered
);

interface GraphProps {
    goal: string;
    dataPoints: { date: string; value: number }[];
}

const Graph: React.FC<GraphProps> = ({ goal, dataPoints }) => {
    const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

    useEffect(() => {
        const labels = dataPoints.map((point) => new Date(point.date));
        const data = dataPoints.map((point) => point.value);

        const newData: ChartData<"line"> = {
            labels,
            datasets: [
                {
                    label: goal,
                    data,
                    borderColor: "rgba(0, 0, 0, 1)", // Black color for the line
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light grey background for fill
                    fill: true,
                    borderWidth: 3, // Increase the line thickness
                    tension: 0, // Curved line (0 for straight)
                },
            ],
        };

        setChartData(newData);
    }, [goal, dataPoints]);

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false, // Allow custom width and height
        plugins: {
            title: {
                display: true,
                text: `${goal} Over Time`,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<"line">) => {
                        const value = tooltipItem.raw as number;
                        return value !== undefined ? `${value} ${goal}` : "";
                    },
                },
            },
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                type: "time", // Use "time" as the scale type
                time: {
                    unit: "day", // Set the time unit (e.g., day, month)
                },
                title: {
                    display: true,
                    text: "Date",
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                beginAtZero: false, // Disable starting at zero for y-axis
                title: {
                    display: true,
                    text: goal,
                },
                ticks: {
                    padding: 10, // Add padding to give some space around labels
                },
            },
        },
    };

    return (
        <div className="p-6 w-full max-w-4xl mx-auto"> {/* Center the graph */}
            {chartData ? (
                <div style={{ position: "relative", height: "300px" }}>
                    <Line data={chartData} options={options} />
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default Graph;
