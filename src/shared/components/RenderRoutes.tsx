import { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import LoadingScreen from './LoadingScreen';

interface Props {
	routes: any;
}

const RenderRoutes: React.FC<Props> = (props) => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Switch>
				{props.routes.map((route: any, index: number) => {
					const Component = route.component;
					const Guard = route.guard || Fragment;
					const Layout = route.layout || Fragment;

					return (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							render={(props) => (
								<Guard>
									<Layout>
										<Component {...props} />
									</Layout>
								</Guard>
							)}
						/>
					);
				})}
			</Switch>
		</Suspense>
	);
};

export default RenderRoutes;
