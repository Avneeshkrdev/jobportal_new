import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Cookies from 'js-cookie'; // Import js-cookie
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handleCreateCompany = async () => {
        try {
            const token = Cookies.get('token'); // Get token from cookies
            if (!token) {
                toast.error('User not authenticated. Please login.');
                return;
            }else{
                console.log(token);
            }

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Attach the token
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error creating company:', error);
            toast.error('An error occurred while creating the company.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={handleCompanyNameChange}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCompany}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
