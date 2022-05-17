import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ViewTodo from "../components/ViewTodo"

import { supabaseClient } from "../lib/client"

export default function TodoDetails() {

    const router = useRouter();
    const { slug } = router.query;

    const [todo, setTodo] = useState([]);

    const user = supabaseClient.auth.user();

    useEffect(() => {
        if (!user) {
          router.push("/signin");
        }
    }, [user, router]);

    useEffect(() => {

        if (user) {
            supabaseClient
                .from("todos")
                .select("*")
                .eq("id", slug)
                .limit(1)
                .single()
                .then(({data, error}) => {
                    console.log(data)
                    setTodo(data)
                })
        }

    }, [user, slug]);

    return (
        <>
            <Navbar />
            <ViewTodo todo={todo} />
        </>
    )
}
