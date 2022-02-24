import { Dialog, ImageList, ImageListItem, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_DATA_PHOTO_REQUEST, SEARCH_PHOTO_REQUEST } from '../../store/list_photo/const';

function ListPhoto() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [itemSelect, setItemSelect] = useState({})

    const { data, loadMore, loading } = useSelector((state) => state.listFotoReducer)
    const observer = useRef();
    const chiledRef = useRef(null);

    const lastElement = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && loadMore) {
                setPage(p => p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, loadMore])

    useEffect(() => {
        if (keyword !== '') {
            dispatch({ type: SEARCH_PHOTO_REQUEST, payload: { keyword: keyword, per_page: 15, page: page } })
        } else {
            dispatch({ type: GET_DATA_PHOTO_REQUEST, })
        }
    }, [keyword, page])


    const handleClickFoto = (item) => {
        setOpen(true)
        setItemSelect(item)
    }
    const handleClose = () => {
        setOpen(false);
    };

    console.log(process.env.REACT_APP_REST_API)
    return (
        <div style={{ padding: 5 }}>
            <TextField
                id="standard-search"
                label="Cari photo"
                type="search"
                variant="standard"
                fullWidth
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <ImageList cols={5}  >
                {data.map((item, index) => {
                    return (
                        <ImageListItem key={item.img} key={item.id} ref={index + 1 === data.length && index > 10 ? lastElement : chiledRef} onClick={() => handleClickFoto(item)}>
                            <img
                                src={`${item.urls.small}`}
                                srcSet={`${item.urls.small}`}
                                alt={item.title}
                            />
                        </ImageListItem>
                    )
                })}
            </ImageList>

            {
                loading ? 'Loading...' : null
            }

            {
                open && <Dialog
                    open={open}
                    onClose={() => handleClose()}
                >
                    <div style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', }}>
                        <Link to={`/${itemSelect.id}`}>
                            <img
                                src={`${itemSelect.urls.regular}`}
                                srcSet={`${itemSelect.urls.regular}`}
                                alt={itemSelect.title}
                                width="500px"
                            />
                        </Link>
                    </div>

                </Dialog>
            }
        </div>
    );
}

export default ListPhoto;
