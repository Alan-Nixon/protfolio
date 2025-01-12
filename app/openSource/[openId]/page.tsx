"use client";

import React, { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  getDownloadsGraph,
  getReadme,
  getSingleOpenSource,
} from "@/app/(utils)/functions";
import { IDownloads, IOpenSource } from "@/interfaces_types/interfaces_types";
import LoadingPage from "@/app/(components)/LoadingPage";

export default function Page() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-31");
  const [domain, setDomain] = useState([0, 50]);
  const [intervals, setIntervals] = useState([0, 0, 0, 0, 20]);
  const [openSource, setOpenSource] = useState<IOpenSource | null>(null);
  const [initialData, setInitialData] = useState<IDownloads[]>([]);
  const { openId } = useParams();

  useEffect(() => {
    if (openId) {
      getSingleOpenSource(openId as string).then(({ data }) => {
        setOpenSource(data);
        getDownloadsGraph(startDate, endDate, data?.title).then(
          (data: IDownloads[]) => {
            const downloads = data?.map((item) => ({
              value: item.downloads,
              day: item.day,
            }));
            const domain = downloads.reduce(
              (acc, curr) => {
                console.log(curr, curr.value);
                acc[0] = Math.min(acc[0], curr.value);
                acc[1] = Math.max(acc[1], curr.value);
                return acc;
              },
              [0, 0]
            );
            setDomain(domain);

            const largestDownload =  domain[1];

            const updatedIntervals = new Array((intervals.length) + (largestDownload - 4)).fill(0);
            console.log(updatedIntervals,intervals.length)
            updatedIntervals[updatedIntervals.length - 1] = Math.ceil(
              largestDownload * 1
            );
            const first = updatedIntervals[0];
            const last = updatedIntervals[updatedIntervals.length - 1];
            const length = updatedIntervals.length;

            if (length <= 2) {
              setIntervals(updatedIntervals);
            }

            const range = last - first;
            const step = range / (length - 1);

            const intervalsData = updatedIntervals.map((_, index) => {
              if (index === 0) return first;
              if (index === length - 1) return last;
              return Math.round(first + index * step);
            });
            console.log(intervalsData);
            setIntervals(intervalsData);
            setInitialData(downloads as typeof initialData);
          }
        );
      });
    }
  }, [openId, startDate, endDate]);

  if (!openSource) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h1 className="text-2xl font-bold mb-4">{openSource?.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="1998-01-01"
              max={endDate}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max="2010-12-31"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <ChartContainer
          config={{
            value: {
              label: "Value",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={initialData}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--muted))"
              />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                dataKey="downloads"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={domain}
                ticks={intervals}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={2}
                // dot={{
                //   r: 4,
                //   fill: "hsl(var(--primary))",
                //   strokeWidth: 0,
                // }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <p className="text-center mt-6 text-gray-600">
          {openSource.description}
        </p>
      </div>
      <ReadmeDisplay packageName={openSource?.title} />
    </div>
  );
}

interface ChartContainerProps {
  config: {
    value: {
      label: string;
      color: string;
    };
  };
  className: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const ChartTooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => (
  <div className="bg-white p-2 border border-gray-200 rounded shadow">
    {content}
  </div>
);

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>{`Year: ${label}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ReadmeDisplay = ({ packageName }: { packageName: string }) => {
  const [readme, setReadme] = useState("");
  useEffect(() => {
    getReadme(packageName).then((data) => setReadme(data));
  }, []);

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <ReactMarkdown
        components={{
          h3: ({ ...props }) => (
            <h3 className="text-blue-600 font-bold text-xl my-4" {...props} />
          ),
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: ({  ...props }) => (
            <div className="my-4">
              <Image
                src={props.src || ""}
                alt={props.alt || ""}
                width={500}
                height={300}
                layout="responsive"
              />
            </div>
          ),
        }}
      >
        {readme === "ERROR: No README data found!" ? readme.slice(7) : readme}
      </ReactMarkdown>
    </div>
  );
};
