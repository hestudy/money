import { eq } from "drizzle-orm";
import { chunk } from "es-toolkit";
import { Outlet } from "react-router";
import { initRecord, allStock } from "~/db/schema";
import db from "~/lib/db";

const getStocks = async () => {
  const res = await fetch("http://api.tushare.pro", {
    body: JSON.stringify({
      api_name: "stock_basic",
      token: process.env.TUSHARE_TOKEN,
      params: {
        ts_code: "",
        name: "",
        exchange: "",
        market: "",
        is_hs: "",
        list_status: "",
        limit: "",
        offset: "",
      },
      fields: [
        "ts_code",
        "symbol",
        "name",
        "area",
        "industry",
        "cnspell",
        "market",
        "list_date",
        "act_name",
        "act_ent_type",
      ],
    }),
    method: "POST",
  });
  return res.json();
};

export async function loader() {
  const count = await db.$count(initRecord, eq(initRecord.name, "stocks"));
  if (count === 0) {
    const res = await getStocks();
    if (res.code === 0) {
      const result: (typeof allStock.$inferInsert)[] = [];
      res.data.items.forEach((item: any[]) => {
        const data: any = {};
        item.forEach((d, index) => {
          data[res.data.fields[index]] = d;
        });
        result.push(data);
      });
      const chunkList = chunk(result, 100);
      for (const item of chunkList) {
        await db.insert(allStock).values(item);
      }
      await db.insert(initRecord).values({
        name: "stocks",
      });
    }
  }
}

export function HydrateFallback() {
  return <div>init stocks...</div>;
}

export default function InitLayout() {
  return <Outlet />;
}
