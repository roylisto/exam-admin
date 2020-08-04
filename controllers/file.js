const fs = require('fs');
const path = require('path');

module.exports = {
  hasil: (req, res) => {
    const directory = 'files';

    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });

    res.json({
      message: 'success delete files'
    });
  },

  uploads: (req, res) => {
    const directory = 'uploads';

    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });

    res.json({
      message: 'success delete files'
    });
  }
}
