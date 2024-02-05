import { useQuery } from "@apollo/client"
import { getAllBooks } from "./queries"

const BooksList = () => {
  const { loading, error, data } = useQuery(getAllBooks);
  console.log({ error })
  return (
    <div>
      {loading ? '...loading data' : (
        <div>
          <h4>Books</h4>
          {data && data?.books?.map((item, index)=> (
            <div key={index}>
              <span>Title</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BooksList
