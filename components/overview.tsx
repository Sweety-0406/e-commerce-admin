"use client";

import {Bar, BarChart, ResponsiveContainer,XAxis, YAxis} from "recharts"

interface OverviewProps{
    data: any[];
}

export const Overview:React.FC<OverviewProps> = ({
    data
})=>{
    const getPath = (x:any, y:any, width:any, height:any) => (
        `M${x},${y + height}
         C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
         C${x + width /2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
         Z`
      );
    const TriangleBar = (props:any) => {
        const {
          fill, x, y, width, height,
        } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
      
    return(
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis 
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    
                />
                <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value)=>`₹${value}`}
                />
                <Bar dataKey="total" fill="#9EA7FF" shape={<TriangleBar />} />
            </BarChart>
        </ResponsiveContainer>
    )
}