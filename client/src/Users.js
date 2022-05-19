import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { USERS } from './queries/userQueries';
import { CREATE_USER } from './mutations/userMutations';
import { useAuth } from './useAuth';


export const UsersContainer = () => {
	useAuth();

	const [firstName, setFirstName ] = useState('');
	const [lastName, setLastName ] = useState('');


	const { loading, data, error } = useQuery(USERS);

	const [ createUserMutation, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER, {
		refetchQueries: [ { query: USERS }]
	});

	//
	if (loading) {
		return <h1>Loading data!!!!!</h1>;
	}

	return (
		<div>
			<input
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			{
				createUserLoading ?
					<h1>Creating user please wait</h1>
					:
					<button
						onClick={async () => {
							await createUserMutation({ variables: { firstName, lastName }});
						}}
					>
						Add User
					</button>
			}
			{
				data.users.map(user => {
					return (
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
							<h1>{user.fullName}</h1>
							<Link to={`/users/${user._id}`}>View profile</Link>
						</div>
					)
				})
			}
		</div>

	)
}
