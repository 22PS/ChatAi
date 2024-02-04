import app from './app.js';
import { connectTODatabase } from './db/connection.js';

// connections and listeners
const PORT = process.env.PORT || 5000;
connectTODatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log('Server Open & Connected to Database 💥')
    );
  })
  .catch((err) => console.log(err));
