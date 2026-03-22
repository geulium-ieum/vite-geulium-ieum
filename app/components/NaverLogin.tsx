import { Button } from '~/components/ui/button';
import { redirect } from 'react-router';
import type { Route } from './+types/NaverLogin';

export async function action ({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const code = formData.get('code') as string;
  const redirectUrl = formData.get('redirectUrl') as string;
  if (!code || !redirectUrl) {
    return redirect('/login');
  }
  try {
    return redirect('/');
  } catch (error) {
    console.log(error);
  }
}

export default function NaverLogin() {
    const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
    const RedirectUrl = 'http://localhost:5173/auth/login/naver'; //Callback URL
    const State = "geulium-ieum"
    const NaverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverClientId}&state=${State}&redirect_uri=${RedirectUrl}`;
    
    const handleNaverLogin = () => {
      try{
        window.location.href = NaverAuthUrl;
        return redirect('/');
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <Button type="button" variant="outline" className="w-full bg-[#2DB400] text-white" onClick={handleNaverLogin}>
        <span className="mr-2">N</span>
          네이버로 로그인
      </Button>
    )
  }