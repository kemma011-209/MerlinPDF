"use client";

import { Layout } from "plotly.js";
import Plot from "react-plotly.js";

function ChartComponent({ payload }: { payload: any }) {
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
                    width: 600,
                    height: 500,
                    barmode: "group"// grouped bars
                };

    return (
        <div className="plot" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Plot
                data={plotData.length ? plotData : [
                    {
                        x: [],
                        y: [],
                        type: "bar",
                        name: ""
                    }
                ]}
                layout={layout} />
        </div>
    );
};

export default ChartComponent;