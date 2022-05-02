const Container = ({ children }) => {

    console.log(children);

    return (
        <div style = {{margin: 20, padding:20, border: "1px solid black"}}>
        { children }
        </div>
    );
};

export default Container;