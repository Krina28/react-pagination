# React Pagination
Pagination Component to use in React JS applications

## Installation

To install this library, run:

```bash
$ npm install react-pagination --save
```

## Consuming your library

Once you have installed it you can import `Pagination` from `react-pagination` in any application component. E.g.

```component
import React, { Component } from "react";
import Pagination from 'react-pagination';

class Users extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Users</h2>
                <Pagination
                    initialPage={1}
                    items={300}
                    onChangePage={(index) => console.log(index)}
                />
            </React.Fragment>
        );
    }
}

export default Users;
```

### Attributes/Options:
       initialPage : Number-Initial Page Number to show
       items: Number-Indicates number of items present in the list
       onChangePage: Function-Which will return page after modification


## Authors
    * Original Author: suresh-borad
    * Author: Krina Soni 
## License

MIT
