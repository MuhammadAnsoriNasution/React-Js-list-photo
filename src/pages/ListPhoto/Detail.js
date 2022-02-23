import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { GET_DETAIL } from '../../store/list_photo/const';

export default function Detail() {
    let params = useParams();
    const dispatch = useDispatch()
    const { detail } = useSelector((state) => state.listFotoReducer)
    useEffect(() => {
        dispatch({ type: GET_DETAIL, id: params.id })
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 30px', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{}}>
                <img
                    src={`${detail?.urls?.full}`}
                    srcSet={`${detail?.urls?.full}`}
                    alt={detail?.title}
                    width="300px"
                />
            </div>
            <span>Views : {detail?.views || 0}</span>
            <span>Likes : {detail?.likes || 0}</span>
            <span>Download : {detail?.download || 0}</span>

        </div>
    )
}
