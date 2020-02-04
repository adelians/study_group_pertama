const express = require('express');
const app = express();
const PORT = 5000;

//set parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//data buatan
let courses = [{
        id: 1,
        title: 'React for beginers',
        description: 'deskripsi'
    },
    {
        id: 2,
        title: 'Road to React Hooks',
        description: 'deskripsi'
    },
    {
        id: 3,
        title: 'React for beginers',
        description: 'deskripsi'
    }
];

app.get('/', (req, res, next) => {
    res.status(200).send("Hi!");
});

// show all data
app.get('/api/courses', (req, res, next) => {
    res.status(200).json(courses);
});

// show single data
app.get('/api/courses/:id', (req, res, next) => {
    // courses.find(data => {
    //     if (data.id == req.params.id) {
    //         return res.status(200).json(data);
    //     }
    // });

    var dataFix = courses.find(data => data.id == req.params.id);

    if (!dataFix) {
        return res.status(404).json({ message: `ID ${req.params.id} Tidak Ditemukan` })
    }

    res.status(200).json(dataFix);
});

// insert data
app.post('/api/courses', (req, res, next) => {
    // const title = req.body.title;
    // const description = req.body.description;

    const { title, description } = req.body;

    var data = {
        id: courses.length + 1,
        title,
        description
    }

    courses.push(data);
    res.status(200).json(courses);
})

// update data
app.put('/api/courses/:id', (req, res, next) => {


    var id = parseInt(req.params.id);
    var updateCourses = req.body;
    if (courses["data" + id] != null) {
        courses["data" + id] = updateCourses;

        console.log("Update Successfully, Data : \n" + JSON.stringify(courses, null, 4));

        res.end("Update Successfully! \n" + JSON.stringify(courses, null, 4));
    } else {
        res.end("Don't exist \n" + JSON.stringify(courses, null, 4));
    }
});

//delete
app.delete('/api/courses/:id', (req, res) => {
    var dataFix = courses.find(data => data.id == req.params.id);

    if (!dataFix) {
        return res.status(404).json({ message: `ID ${req.params.id} Tidak Ditemukan` })
    }

    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    res.send(courses);
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));