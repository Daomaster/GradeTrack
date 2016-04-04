import _assignment
import _types
import _course
import _grade
import _instructor
import _school
import _student
import _weight

import random
import rand_name
import rand_course
import copy
import math
import datetime

def noneSingleGroup( item, none, expectedType ):

    if item is None:
        if hasattr( none, "__call__" ):
            return none()
        else:
            return none
    elif isinstance( item, expectedType ):
        return item
    elif isinstance( item, ( tuple, list ) ):
        for index, element in enumerate( item ):
            if not isinstance( element, expectedType ):
                raise Exception( "ERROR: expected iterable to contain only instance of " + expectedType.__name__ + ", got instance of " + element.__class__.__name__ + " at index " + str( index ) )
        return random.choice( item )
    elif isinstance( item, dict ):
        item = item.items()
        for element in item:
            if not isinstance( element[ 1 ], expectedType ):
                raise Exception( "ERROR: expected iterable to contain only instance of " + expectedType.__name__ + ", got instance of " + element[ 1 ].__class__.__name__ + " at key \"" + str( element[ 0 ] ) + "\"" )
        return random.choice( item )[ 1 ]
    else:
        raise Exception( "ERROR: expected instance of " + expectedType.__name__ + ", got instance of " + item.__class__.__name__ )

FLOAT_RANGED = 1
INT_RANGED = 0
def noneSingleRange( item, none, rangeType = INT_RANGED ):

    if item is None:
        return random.randint( none[ 0 ], none[ 1 ] )
    elif isinstance( item, ( int, float, long ) ):
        return item
    elif isinstance( item, ( tuple, list ) ):
        if len( item ) == 2:
            if rangeType == INT_RANGED:
                return random.randint( item[ 0 ], item[ 1 ] )
            elif rangeType == FLOAT_RANGED:
                return random.random() * ( item[ 1 ] - item[ 0 ] ) + item[ 0 ]
            else:
                raise Expection( "ERROR: unregonized type range" )
        elif len( item ) == 3:
            if rangeType == INT_RANGED:
                temp = random.randint( 0, int( math.floor( ( item[ 1 ] - item[ 0 ] ) / item[ 2 ] ) ) )
                return item[ 0 ] + temp * item[ 2 ]
            elif rangeType == FLOAT_RANGED:
                raise Exception( "Just No" )
            else:
                raise Expection( "ERROR: unregonized type range" )
    else:
        raise Exception( "ERROR: expected instance of tuple, list, int, or float, got instance of " + item.__class__.__name__ )

highest_assignment_id = 0
def Assignment( _id = None, title = None, _type = None, assigned = None, due = None, total = None ):
    global highest_assignment_id

    if _id is None:
        _id = str( highest_assignment_id )
        highest_assignment_id += 1

    _type = noneSingleGroup( _type, random.choice( _types.Weight.LIST ), str )
    title = noneSingleGroup( title, str( _type ) + " " + _id, str )
    assigned = noneSingleGroup( assigned, Date(), datetime.datetime )

    # if no due date was given then make one up some time after the assigned time
    if due is None:
        due = assigned + datetime.timedelta( random.randint( 1, 30 ) )

    total = noneSingleRange( total, (1, 100) )

    return _assignment.Assignment( _id = _id, title = title, total = total, _type = _type, assigned = assigned, due = due )

def Course( subject = None, number = None, section = "1001", term = None, year = None, title = None ):
    if subject is None or number is None or title is None:
        temp = rand_course.short()

    subject = noneSingleGroup( subject, temp[ "subject" ], str )
    number = str( noneSingleGroup( number, temp[ "number" ], ( str, int ) ) )
    section = str( noneSingleGroup( section, "1001", ( str, int ) ) )
    term = noneSingleGroup( term, random.choice( [ "FA", "FA", "FA", "SP" ] ), str )
    year = str( noneSingleGroup( year, random.choice( [ "15", "16", "16", "16" ] ), ( str, int ) ) )
    title = noneSingleGroup( title, temp[ "title" ], str )

    return _course.Course( subject = subject, number = number, section = section, term = term, year = year, title = title )

def Date( year = None, month = None, day = None, hour = None, minute = None, second = None ):
    year = noneSingleRange( year, ( 1970, 2016 ) )
    month = noneSingleRange( month, (1, 12) )
    day = noneSingleRange( day, (1,28) )
    hour = noneSingleRange( hour, (0,23) )
    minute = noneSingleRange( minute, (0,59) )
    second = noneSingleRange( second, (0,59) )

    return datetime.datetime( year = year, month = month, day = day, hour = hour, minute = minute, second = second )

def Grade( assignment = None, grade = None ):
    assignment = noneSingleGroup( assignment, Assignment(), _assignment.Assignment )

    if grade is None:
        mu = 80
        sigma = 10
        grade = int( min( 100, max( 0, random.normalvariate( mu, sigma ) ) ) * assignment.total / 100.0 )

    return _grade.Grade( assignment = assignment, grade = grade )

highest_instructor_id = 0
def Instructor( _id = None, first = None, last = None ):
    global highest_instructor_id

    first = noneSingleGroup( first, rand_name.first(), str )
    last = noneSingleGroup( last, rand_name.last(), str )

    if _id is None:
        highest_instructor_id += int( random.random() * 17 ) + 17
        _id = "%09d" % highest_instructor_id
        highest_instructor_id += int( random.random() * 17 ) + 17

    return _instructor.Instructor( _id = _id, first = first, last = last )

def School( ipeds, name, courses = None, classes = None, students = None, instructors = None, permissions = None ):
    school = _school.School( ipeds = ipeds, name = name )

    # Adds the courses
    if courses is None:
        randNum = random.randint( 5, 10 )
        courses = {}
        for count in xrange( randNum ):
            school.add( Course() )
    elif isinstance( courses, _course.Course ):
        school.add( courses )
    elif isinstance( courses, list ):
        for index, course in enumerate( courses ):
            if not isinstance( course, _course.Course ):
                raise Exception( "All indices are expected to be of Type course, but the element at index " + str( index ) + " is of type " + course.__class__.__name__ )
        for course in courses:
            school.add( course )
    else:
        raise Exception( "ERROR: expected instance of 'None' or of type 'Course' or 'list[ Course ]', got instance of \'" + courses.__class__.__name__ + "\'" )

    # Adds the students
    if students is None:
        randNum = random.randint( 20, 30 )
        students = {}
        for count in xrange( randNum ):
            school.add( Student() )
    elif isinstance( students, _student.Student ):
        school.add( students )
    elif isinstance( students, list ):
        for index, student in enumerate( students ):
            if not isinstance( student, _student.Student ):
                raise Exception( "All indices are expected to be of Type student, but the element at index " + str( index ) + " is of type " + student.__class__.__name__ )
        for student in students:
            school.add( student )
    else:
        raise Exception( "ERROR: expected instance of 'None' or of type 'Student' or 'list[ Student ]', got instance of \'" + students.__class__.__name__ + "\'" )

    # Adds the instructors
    if instructors is None:
        randNum = random.randint( 20, 30 )
        instructors = {}
        for count in xrange( randNum ):
            school.add( Instructor() )
    elif isinstance( instructors, _instructor.Instructor ):
        school.add( instructors )
    elif isinstance( instructors, list ):
        for index, instructor in enumerate( instructors ):
            if not isinstance( instructor, _instructor.Instructor ):
                raise Exception( "All indices are expected to be of Type instructor, but the element at index " + str( index ) + " is of type " + instructor.__class__.__name__ )
        for instructor in instructors:
            school.add( instructor )
    else:
        raise Exception( "ERROR: expected instance of 'None' or of type 'Instructor' or 'list[ Instructor ]', got instance of \'" + instructors.__class__.__name__ + "\'" )

    # Adds the classes
    if classes is None:
        randNum = random.randint( 20, 30 )
        classes = {}
        for count in xrange( randNum ):
            school.add( Class() )
    elif isinstance( classes, _class.Class ):
        school.add( classes )
    elif isinstance( classes, list ):
        for index, classy in enumerate( classes ):
            if not isinstance( classy, _class.Class ):
                raise Exception( "All indices are expected to be of Type classy, but the element at index " + str( index ) + " is of type " + classy.__class__.__name__ )
        for classy in classes:
            school.add( classy )
    else:
        raise Exception( "ERROR: expected instance of 'None' or of type 'Class' or 'list[ Class ]', got instance of \'" + classes.__class__.__name__ + "\'" )

    return school

highest_nshe_id = 1000000000
def Student( _id = None,first = None, last = None ):
    global highest_nshe_id

    first = noneSingleGroup( first, rand_name.first(), str )
    last = noneSingleGroup( last, rand_name.last(), str )

    if _id is None:
        highest_nshe_id += int( random.random() * 17 ) + 17
        _id = highest_nshe_id
        highest_nshe_id += int( random.random() * 17 ) + 17

    student = _student.Student( _id = _id, first = first, last = last )

    return student

def Weight( _type = None, weight = (0, 1) ):

    _type = noneSingleGroup( _type, random.choice( _types.Weight.LIST ), str )

    weight = noneSingleRange( weight, (0, 1), FLOAT_RANGED )

    return _weight.Weight( _type = _type, weight = weight )

if __name__ == "__main__":
    # Assignment( guid = None, title = "", _type = None, assigned = None, due = None, total = (1, 100) )
    print Assignment(), "\n"
    print Assignment(), "\n"
    # Weight( _type = None, grade_weight = (0, 1) )
    print Weight(), "\n"

    # Instructor( first = None, last = None, faculty_id = None )
    print Instructor()
    print "highest_instructor_id =", highest_instructor_id, "\n"

    # Student( first = None, last = None, nshe_id = None )
    print Student()
    print "highest_nshe_id =", highest_nshe_id, "\n"

    # Course( subject = None, number = None, section = None, term = None, year = None, title = None )
    print Course(), "\n"

    # Class( course = None, instructor = None, students = None, assignments = None, weights = None )
    instructors = [ Instructor() for x in xrange( 5 ) ]
    print Class( students = [ Student() for x in xrange( 30 ) ], instructor = instructors ), "\n"
    print Class( students = [ Student() for x in xrange( 30 ) ], instructor = instructors ), "\n"
    print Class( students = [ Student() for x in xrange( 30 ) ], instructor = instructors ), "\n"

'''
    import assignment
import _types
                            import catalog
                            import classes
        import classy
    import course
import date
    import instructor
        import instructors
                            import school
    import student
        import students
    import weight
'''
