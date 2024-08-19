const App = () => {
  const api = process.env.APP_API_URL;
  console.log(api)
  return <h2>유인철입니다.</h2>
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);