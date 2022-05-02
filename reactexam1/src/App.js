//import logo from './logo.svg';
// import './App.css';
import Container from './Container';
import Counter from './Counter';
// import MyFooter from './MyFooter';
import MyHeader from './MyHeader';

function App() {
  // const style = {
  //   App: {
  //     backgroundColor : "black",
  //   },
  //   h2: {
  //     color: "red",
  //   },
  //   bold_text: {
  //     color: "green",
  //   },
  // };

  // const number = 5;
  const counterProps = {
    a: 1,
    // initialValue: 5,
  }

  return (
      <Container>
        <div>
          <MyHeader />
          <Counter {...counterProps} />
        </div>
      </Container>
    // <div className="App">
    // <div style={style.App}>
    //   <MyHeader />
    //     <h2 style={style.h2}>
    //       안녕 리액트 
    //     </h2>
    //   <MyFooter />
    //     <b style={style.bold_text}>
    //       {number}는 : {number % 2 === 0 ? "짝수" : "홀수"} 
    //     </b>
    //   <br />
    // </div>

  );
}

// module.exports = {}  commonjs 모듈시스템
export default App;   //esjs 모듈시스템

