
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import GoalForm from "../components/GoalForm";
import {getGoals, reset} from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const {goals, isLoading, isError, message} = useSelector((state) => state.goals);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getGoals());

        // if you want to do something right after the component is unmounted, return the function like this:
        return () => {
            dispatch(reset());
        }
    }, [
        user,
        navigate,
        isError,
        message,
        dispatch,
    ]);

    if (isLoading) {
        return <Spinner />;
    }

    return <>
        <section className='heading'>
            <h1>Welcome {user && user.name}</h1>
            <p>Goals Dashboard</p>
        </section>
        <GoalForm />
        <section className='content'>
            {goals && goals.length > 0 ? (
                <div className='goals'>
                    {goals.map(goal => () => (
                        <GoalItem key={goal.id} goal={goal} />
                    ))}
                </div>
            ) : (
                <h3>You have no goals yet!</h3>
            )}
        </section>
    </>;
}

export default Dashboard;
