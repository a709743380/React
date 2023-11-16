import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import  Signin  from "./Pages/Signin";
import  Posts  from "./Pages/Posts";
import  Newposts  from "./Pages/new_posts";
import  ViewPost  from "./Pages/ViewPost";

function App() {
    return (
        <BrowserRouter>
            {/* Header固定 */}
            <Header />
            <Routes>
                <Route path="/Posts"   element={<Posts />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/new_posts" element={<Newposts />} />
                <Route path="/ViewPost/:paramId" element={<ViewPost />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;