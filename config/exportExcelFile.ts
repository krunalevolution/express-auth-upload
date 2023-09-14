import Excel from "exceljs";
import path from "path";

type Users = {
  name: String;
  email: String;
};

const exportExcelFile = async (data: Users[]) => {
  //   console.log("Call");

  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet("Verified Users");

  sheet.columns = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "email",
      header: "Email",
    },
  ];

  data.forEach((el) => {
    sheet.addRow(el);
  });

  const exportToPath = path.resolve(process.cwd(), "Verifieduserslist.csv");
  await workbook.csv.writeFile(exportToPath);
};

export default exportExcelFile;
