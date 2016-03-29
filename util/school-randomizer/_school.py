from _course import Course
from _student import Student
from _instructor import Instructor
import json

class School():
    def __init__( self, ipeds, name, courses = {}, students = {}, instructors = {}, permissions = {} ):
        e = "\'%s\' is expected to be of type \'%s\', but it is of type \'%s\'."

        if isinstance( courses, Course ):
            courses = { str( courses.id ) : courses }

        if isinstance( students, Student ):
            students = { str( students.id ) : students }

        if isinstance( instructors, Instructor ):
            instructors = { str( instructors.id ) : instructors }

        self.ipeds = ipeds
        self.name = name
        self.courses = courses
        self.students = students
        self.instructors = instructors
        #self.permissions = None

    def add( self, item ):
        if isinstance( item, Course ):
            while item.id in self.courses:
                item.section = str( int( item.section ) + 1 )
                item.id = "-".join( [ item.subject, item.number, item.section, item.term, item.year ] )
            self.courses[ item.id ] = item
        elif isinstance( item, Student ):
            self.students[ item.id ] = item
        elif isinstance( item, Instructor ):
            self.instructors[ item.id ] = item
        else:
            raise Exception( "this shouldn't happen" )

    def dict( self ):
        courseList = {}
        courses = {}
        for _id in self.courses:
            courses[ _id ] = self.courses[ _id ].dict()
            semester = self.courses[ _id ].term + "-" + self.courses[ _id ].year
            if not semester in courseList:
                courseList[ semester ] = {} 
            courseList[ semester ][ _id ] = self.courses[ _id ].subject + " " + self.courses[ _id ].number + " " + self.courses[ _id ].section + " " + self.courses[ _id ].title
        courses[ "list" ] = courseList

        studentList = {}
        students = {}
        for _id in self.students:
            students[ _id ] = self.students[ _id ].dict()
            studentList[ _id ] = self.students[ _id ].first + " " + self.students[ _id ].last
        students[ "list" ] = studentList

        instructorList = {}
        instructors = {}
        for _id in self.instructors:
            instructors[ _id ] = self.instructors[ _id ].dict()
            instructorList[ _id ] = self.instructors[ _id ].first + " " + self.instructors[ _id ].last
        instructors[ "list" ] = instructorList

        return {
            "ipeds" : self.ipeds,
            "name" : self.name,
            "courses" : courses,
            "students" : students,
            "instructors" : instructors
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )

    def __str__( self ):
        temp = "ipeds: " + self.ipeds + "\n"
        temp += "name: " + self.name + "\n"
        temp += "\ncourses:\n"
        for _id in self.courses:
            temp += "    " + str( self.courses[ _id ] ) + "\n"
        temp += "\nstudents:\n"
        for _id in self.students:
            temp += "    " + str( self.students[ _id ] ) + "\n"
        temp += "\ninstructors:\n"
        for _id in self.instructors:
            temp += "    " + str( self.instructors[ _id ] ) + "\n"

        return temp

if __name__ == "__main__":
    import rand
    import random
    import _weight
    import _types

    school = School( "182281", "University of Nevada, Las Vegas" )

    for item in range( 3 ):
        school.add( rand.Course() )
    for item in range( 5 ):
        school.add( rand.Student() )
    for item in range( 2 ):
        school.add( rand.Instructor() )


    students = school.students.values()
    weights = list( _types.Weight.LIST )
    for course in school.courses.values():
        course.add( random.choice( school.instructors.values() ) )

        classSize = random.randint( min( 10, len( students ) ), min( 20, len( students ) ) )
        random.shuffle( students )
        for index in xrange( classSize ):
            course.add( students[ index ] )

        weightCount = random.randint( 1, len( weights ) )
        random.shuffle( weights )
        for index in xrange( weightCount ):
            course.add( rand.Weight( _type = weights[ index ] ) )
            assignmentCount = random.choice( ( 0, 0, 0, 1, 1, 2 ) )
            for inner in xrange( assignmentCount ):
                assignment = rand.Assignment( _type = weights[ index ] )
                course.add( assignment )
                if random.random() < .5:
                    for student in course.students:
                        student.add( ( course, rand.Grade( assignment = assignment ) ) )

        
    #print school
    #print school.dict()
    print "{", "\"" + school.ipeds + "\"", ":", school.json( indent = 2 ), "}"
