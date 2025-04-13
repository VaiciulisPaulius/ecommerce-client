import React, {createContext, useContext} from 'react'
import {useJsonApi} from "./JsonApiContext.jsx";
import {useAuth} from "./AuthContext.jsx";
import {useStatus} from "./StatusProvider.jsx";
import {useDummyApi} from "./DummyApiContext.jsx";

const ProfileContext = createContext(null)

function ProfileProvider({children}) {
    const {request} = useJsonApi()
    const { request: dummyApiRequest } = useDummyApi();
    const {user} = useAuth()
    const {setNewStatus} = useStatus()

    const addRecipeFavourite = async recipeId => {
        if(!user) {
            setNewStatus("User not logged in. Cant add favourite recipe.", "error")
            return;
        }
        const recipe = await getRecipeFavourite(recipeId);
        if(recipe.length != 0) {
            setNewStatus("This recipe has already been favoured.", "error")
        }
        console.log("a")

        const res = await request("POST", `/favourites`, {recipeId: recipeId, userId: user.id});
        console.log(res)
    }
    const removeRecipeFavourite = async recipeId => {
        if(!user) {
            setNewStatus("User not logged in. Cant add favourite recipe.", "error")
            return;
        }
        const recipe = await getRecipeFavourite(recipeId);
        if(recipe.length == 0) {
            setNewStatus("This recipe has already been removed from favourites.", "error")
            return;
        }

        console.log(recipe)
        await request("DELETE", `/favourites/${recipe[0].id}`);
    }
    const getRecipeFavourite = async recipeId => {
        if(!user) {
            setNewStatus("User not logged in. Cant get favourite recipe.", "error")
            return;
        }
        const recipe = await request("GET", `/favourites?recipeId=${recipeId}`);
        if(recipe) return recipe
        else return null
    }
    const getAllRecipeFavourites = async () => {
        if(!user) {
            setNewStatus("User not logged in. Cant get favourite recipe.", "error")
            return;
        }
        const favourites = await request("GET", `/favourites`);

        if (!favourites || favourites.length === 0) {
            setNewStatus("No favourite recipes found.", "error");
            return;
        }

        const recipeIds = favourites.map(fav => fav.recipeId);

        const recipes = await Promise.all(
            recipeIds.map(id => dummyApiRequest("GET", `/recipes/${id}`)) // Assuming your dummy API has a /recipes endpoint
        );

        if(recipes) return recipes
        else return null
    }

    return (
        <ProfileContext.Provider value={{addRecipeFavourite, removeRecipeFavourite, getRecipeFavourite, getAllRecipeFavourites}}>
            {children}
        </ProfileContext.Provider>
    )
}
export const useProfile = () => useContext(ProfileContext);

export default ProfileProvider
