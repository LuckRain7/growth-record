const CONFIG = require("./config"),
  bodyParser = require("body-parser"),
  multiparty = require("multiparty"),
  fs = require("fs"),
  path = require("path");

/*-CREATE SERVER-*/
const express = require("express"),
  app = express();
app.listen(CONFIG.PORT, () => {
  console.log(`SERVICE IS OK ===> ${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
  const { ALLOW_ORIGIN, CREDENTIALS, HEADERS, ALLOW_METHODS } = CONFIG.CROS;
  res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", CREDENTIALS);
  res.header("Access-Control-Allow-Headers", HEADERS);
  res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
  req.method === "OPTIONS"
    ? res.send("CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!")
    : next();
});
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "1024mb",
  })
);

/*-API-*/
const upload_dir = path.resolve(__dirname, "", "upload");

app.post("/single", (req, res) => {
  new multiparty.Form().parse(req, function(err, fields, file) {
    if (err) {
      res.send({
        code: 1,
        codeText: err,
      });
      return;
    }
    const [chunk] = file.chunk,
      [filename] = fields.filename,
      chunk_dir = `${upload_dir}/${filename}`;
    let readStream = fs.createReadStream(chunk.path),
      writeStream = fs.createWriteStream(chunk_dir);
    readStream.pipe(writeStream);
    readStream.on("end", function() {
      fs.unlinkSync(chunk.path);
    });
    res.send({
      code: 0,
      codeText: "",
      path: `http://127.0.0.1:${CONFIG.PORT}/upload/${filename}`,
    });
  });
});

app.post("/single2", (req, res) => {
  let { chunk, filename } = req.body;
  let chunk_dir = `${upload_dir}/${filename}`;
  chunk = decodeURIComponent(chunk).replace(/^data:image\/\w+;base64,/, "");
  chunk = Buffer.from(chunk, "base64");
  fs.writeFileSync(chunk_dir, chunk);
  res.send({
    code: 0,
    codeText: "",
    path: `http://127.0.0.1:${CONFIG.PORT}/upload/${filename}`,
  });
});

app.post("/chunk", (req, res) => {
  new multiparty.Form().parse(req, function(err, fields, file) {
    if (err) {
      res.send({
        code: 1,
        codeText: err,
      });
      return;
    }
    let [chunk] = file.chunk,
      [filename] = fields.filename;
    let filepath = filename.substring(0, filename.indexOf("-")),
      chunk_dir = `${upload_dir}/${filepath}`;
    if (!fs.existsSync(chunk_dir)) {
      // 不存在目录就创建一个
      fs.mkdirSync(chunk_dir);
    }
    chunk_dir = `${upload_dir}/${filepath}/${filename}`;
    let readStream = fs.createReadStream(chunk.path),
      writeStream = fs.createWriteStream(chunk_dir);
    readStream.pipe(writeStream);
    readStream.on("end", function() {
      fs.unlinkSync(chunk.path);
    });
    res.send({
      code: 0,
      codeText: "",
    });
  });
});

app.post("/merge", (req, res) => {
  let { filename } = req.body;
  let dotIn = filename.lastIndexOf("."),
    filepath = `${upload_dir}/${filename.substring(0, dotIn)}`,
    filenamePath = `${upload_dir}/${filename}`;
  fs.writeFileSync(filenamePath, "");
  let pathList = fs.readdirSync(filepath);
  pathList
    .sort((a, b) => a.localeCompare(b))
    .forEach(item => {
      fs.appendFileSync(filenamePath, fs.readFileSync(`${filepath}/${item}`));
      fs.unlinkSync(`${filepath}/${item}`);
    });

  setTimeout(() => {
    fs.rmdirSync(filepath);
  }, 500);

  res.send({
    code: 0,
    codeText: "",
    path: `http://127.0.0.1:${CONFIG.PORT}/upload/${filename}`,
  });
});

app.use(express.static("./"));
app.use((req, res) => {
  res.status(404);
  res.send("NOT FOUND!");
});
