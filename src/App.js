import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import AddNewBook from "./components/AddNewBook";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<BookList />}></Route>
          <Route path="/add-new" element={<AddNewBook />}></Route>
          <Route path="/edit-book/:Id" element={<AddNewBook />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
