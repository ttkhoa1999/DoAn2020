import React from 'react';
import NotFound from './components/NotFound';
import DangNhap from './components/DangNhap';
import DangKy from './components/DangKy';
import DangKyDoAn from './components/DangKyDoAn';
import QuanLyDoAn from './components/QuanLyDoAn';
import ThongTin from './components/ThongTin';
import Them from './components/Them';
import DanhSachGiaoVien from './components/DanhSachGiaoVien';
import SuaDoAn from './components/SuaDoAn';
import Order from './components/Order';



const routes = [
    {
        path : '/',
        exact : true,
        main : ({history}) => <DangNhap history={history}/>
    },
    {
        path : '/DangKy',
        exact : false,
        main : ({history}) => <DangKy history={history}/>
    },
    {
        path : '/ThongTin',
        exact : true,
        main : () => <ThongTin />
    },
    {
        path : '/DangKyDoAn',
        exact : false,
        main : ({history}) => <DangKyDoAn history={history}/>
    },
    {
        path : '/QuanLyDoAn',
        exact : false,
        main : ({history}) => <QuanLyDoAn history={history}/>
    },
    {
        path : '/Them',
        exact : false,
        main : ({history}) => <Them history={history}/>
    },
    {
        path : '/:id/tgv',
        exact : false,
        main : ({match, history}) => <DanhSachGiaoVien match={match} history={history}/>
    },
    {
        path : '/:id/edit',
        exact : false,
        main : ({match, history}) => <SuaDoAn match={match} history={history}/>
    },
    {
        main : ({history}) => <Order history={history}/>
    },
    {
        path : '',
        exact : false,
        main : () => <NotFound />
    }
]

export default routes;