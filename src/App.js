import React from 'react';

export default function App() {
  return (
    <div>
      <Routes>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/apikey" component={ApiKey} />
          <Route exact path="/transfer" component={Transfer} />
        </Switch>
      </Routes>
    </div>
  );
}
