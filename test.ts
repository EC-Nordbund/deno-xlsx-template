import xlsx from "./mod.ts";

const file = Deno.readFileSync("./xl.xlsx");

const result = xlsx(file, 1, {
  extractDate: new Date(),
  dates: [
    new Date("2013-06-01"),
    new Date("2013-06-02"),
    new Date("2013-06-03"),
  ],
  people: [
    { name: "John Smith", age: 20 },
    { name: "Bob Johnson", age: 22 },
  ],
});

Deno.writeFileSync("./done.xlsx", result);
