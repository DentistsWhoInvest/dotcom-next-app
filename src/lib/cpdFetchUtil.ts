import path from "path";
import fs from "fs";
import { fetchEndpointData } from "./fetchUtils";

const fetchAllItems = async (url: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const populateFields = [
        "overview_horizontal_banner",
        "overview_horizontal_banner.cover_image",
        "form_horizontal_banner",
        "form_horizontal_banner.cover_image",
        "quiz_horizontal_banner",
        "quiz_horizontal_banner.cover_image",
        "quiz_questions",
        "quiz_questions.potential_answers",
        "reflections_horizontal_banner",
        "reflections_horizontal_banner.cover_image",
        "reflections",
        "reflections.reflection_question",
        "quiz_result_pass_horizontal_banner",
        "quiz_result_pass_horizontal_banner.cover_image",
        "quiz_result_fail_horizontal_banner",
        "quiz_result_fail_horizontal_banner.cover_image",
      ];
      const response = await fetchEndpointData(url, populateFields, true, {
        page: page,
        pageSize: pageSize,
      });
      const meta = response.meta;
      allItems = allItems.concat(response.data);
      hasMore = page < meta.pagination.pageCount;
      page++;
    } catch (error) {
      console.error("Error fetching items:", error);
      hasMore = false;
    }
  }
  return allItems;
};

function writeToLocal(result: any[]) {
  const filePath = path.join(process.cwd(), "public", "cpd.json");

  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

let cachedData: any = null;

export async function fetchCPD() {
  if (cachedData) return cachedData;

  const fetchedCPD = await fetchAllItems("/cpd-courses");
  await writeToLocal(fetchedCPD);

  const filePath = path.join(process.cwd(), "public", "cpd.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);
  cachedData = parsedData;
  return cachedData;
}
