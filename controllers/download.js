module.exports = {
  get: (req, res) => {
    let { file } = req.query;
    const filePath = `${__dirname}/../files/${file}`;

    res.download(filePath, file, (error, file) => {
      if (error) {
        res.send('Cannot find specified file.');
        res.end();
      } else {
        res.end();
      }
    });
  },
}