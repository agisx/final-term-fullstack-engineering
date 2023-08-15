import { Switch, Route, Link } from "react-router-dom";

// Import pages
import Home from './Home';
import VideoOffer from './VideoOffer';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:video_id" component={VideoOffer} />
    </Switch>
  );
}

export default App;
