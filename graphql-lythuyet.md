# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Lược đồ và các loại

    - myField: [String!] ==> Danh sách có thể là null, Nhưng nó không thể bất kì thành viên nào null
        Example:    myField: null // valid
                    myField: [] // valid
                    myField: ['a', 'b'] // valid
                    myField: ['a', null, 'b'] / error

    - myField: [String]! ==> Danh sáchh không thể rỗng nhưngg nó có thể chứa các giá trij null
         Example:   myField: null // error
                    myField: [] // valid
                    myField: ['a', 'b'] // valid
                    myField: ['a', null, 'b'] // valid

    - ... on Class{} : Để yêu cầu một trường trên một loại đối tượng cụ thể. và có thể dùng để search kết hợp nhiều class

    - Fragment: {
        hero {
            ...NameAndAppearances // Sử dụng fragment có thể khai báo được các field trong graphql có thể dùng chung.
        friends {
            ...NameAndAppearances
        friends {
            ...NameAndAppearances
            }
            }
            }
        }
        // Khai báo field có thể dùng lại.
        fragment NameAndAppearances on Character {
            name
            appearsIn
        }

        - Trong khi name trường đang được giải quyết, các trường appearsInvà starshipsvcó thể được giải quyết đồng thời.
        {

        // Từ trên xuống dưới sẽ chạy đồng bộ với nhau
        human(id: 1002) {
            name
            appearsIn
            starships {
                name
                }
            }
        }

        //Để kiểm tra một loại class cụ thể
        {
            type(name: "User"){
                name
            }
        }

        //kiểm tra một đối tượng 