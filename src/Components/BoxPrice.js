import './BoxPrice.css';
import React from 'react'
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import NumberFormat from 'react-number-format';

function BoxPrice({title, price, color, textColor='grey'}) {
    return (
			<div className="Box">
				<span className="title" style={{color: textColor}}>{title}</span>
				<span className="Price">
					<FiberManualRecordSharpIcon style={{ color: color, fontSize:'14px', marginRight:"0.3em" }} />
					<NumberFormat
						value={price}
						className="foo"
						displayType={'text'}
						thousandSeparator={true}
						prefix={'$'}
						renderText={(value, props) => <div {...props}>{value}</div>}
                        style={{fontSize:'15px', fontWeight:'300'}}
                    />
				</span>
			</div>
		);
}

export default BoxPrice
