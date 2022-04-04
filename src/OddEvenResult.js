const OddEvenResult = ({ count }) => {

    console.log(`나는야 ${count}`);

    return <>{count % 2 === 0? "짝수" : "홀수"}</>;
};

export default OddEvenResult;