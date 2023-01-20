function CproductCompo(props) {
    return (
        <div key={`${props.product.id}cdiv`} className='c_product_box'>
            <img key={`${props.product.id}cimg`} className="c_product_img" src={props.product.img} />
            <p key={`${props.product.id}cp`}>{props.product.name}</p>
        </div>
    );
}

export default CproductCompo;