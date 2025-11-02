"use client";

import { Layout } from "plotly.js";
import Plot from "react-plotly.js";

function ChartComponent({ payload, height = 240 }: { payload: any; height?: number }) {
    const { objects, values, types } = payload;
    
    function getTypedData() {
        const uniqueTypes = Array.from(new Set(types || [])) as string[];

        // Create dictionary with each type as key and empty arrays for objects and values
        const data_by_type: { [type: string]: { objects: string[]; values: number[] } } = {};
        for (const t of uniqueTypes) {
            data_by_type[t] = { objects: [], values: [] };
        }

        for (let i = 0; i < (types || []).length; i++) {
            const t = String(types[i]);
            data_by_type[t].objects.push(String(objects[i]));
            data_by_type[t].values.push(Number(values[i]));
        }

        return data_by_type;
    }

    const dataByType = getTypedData();
    const plotData = Object.keys(dataByType).map((t) => ({
        x: dataByType[t].objects,
        y: dataByType[t].values,
        type: "bar" as const,
        name: t
    }));
    const layout: Partial<Layout> = {
                    xaxis: { title: { text: "Objects" } },
                    yaxis: { title: { text: "Values" } },
                    margin: { l: 40, r: 10, t: 10, b: 40 },
                    barmode: "group",
                    height
                };

    return (
        <div className="plot" style={{ display: 'block', width: '100%', height }}>
            <Plot
                data={plotData.length ? plotData : [
                    { x: [], y: [], type: "bar", name: "" }
                ]}
                layout={layout}
                style={{ width: '100%', height: '100%' }}
                config={{ responsive: true }}
            />
        </div>
    );
};

export default ChartComponent;