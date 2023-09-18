'use client';
import { Icons } from '@/components/Image';
// import { useUser } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withPrivateRoute = <T extends object>(WrappedComponent: React.FunctionComponent<T>) => {
  const ComponentWithPrivateRoute = (props: T) => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    // const { isLoading: isProfileLoading } = api.auth.getProfile.useQuery();

    useEffect(() => {
      if (!user && !isLoading) {
        router.push('/login');
      }
    }, [user, isLoading, router]);

    // if (!user || isLoading || isProfileLoading) {
    if (!user || isLoading) {
      return <Icons.loading />;
    }
    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};

export default withPrivateRoute;
