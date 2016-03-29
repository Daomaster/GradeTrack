if __name__ == "__main__":
    import _school
    import rand
    import random
    import _weight
    import _types
    import json
    import sys
    
    if len( sys.argv ) == 2 and sys.argv[ 1 ] == "-d":
        ipeds = "182281"
        name = "University of Nevada, Las Vegas"
        courseCount = 100
        studentCount = 200
        instructorCount = 50
        classMin = 10
        classMax = 20
        ofile = open( "unlv.json", "w" )
    else:
        ipeds = ""
        while ipeds == "":
            ipeds = raw_input( "Enter school's ipeds: " )

        name = ""
        while name == "":
            name = raw_input( "Enter school's name: " )

        while True:
            ofile = ""
            while ofile == "":
                ofile = raw_input( "Enter the output file. Trust me you want one: " )

            ofile = open( ofile, "w" )
            break
    
        if len( sys.argv ) == 2 and sys.argv[ 1 ] == "-l":
            courseCount = 300
            studentCount = 750
            instructorCount = 125
            classMin = 10
            classMax = 50
        
        elif len( sys.argv ) == 2 and sys.argv[ 1 ] == "-m":
            courseCount = 100
            studentCount = 200
            instructorCount = 50
            classMin = 10
            classMax = 20
        
        elif len( sys.argv ) == 2 and sys.argv[ 1 ] == "-s":
            courseCount = 10
            studentCount = 20
            instructorCount = 5
            classMin = 5
            classMax = 10
        
        elif len( sys.argv ) == 2 and sys.argv[ 1 ] == "-i":
            courseCount = 3
            studentCount = 5
            instructorCount = 2
            classMin = 1
            classMax = 3

        else:

            while True:
                try:
                    courseCount = int( raw_input( "Enter number of courses in the school: " ) )
                    if courseCount < 0:
                        print "Negative courses? Really?"
                    else:
                        break
                except ValueError, e:
                    print "Only integer number of courses are possible"

            while True:
                try:
                    studentCount = int( raw_input( "Enter number of students in the school: " ) )
                    if studentCount < 0:
                        print "Beware the anti-students! No negatives."
                    else:
                        break
                except ValueError, e:
                    print "Only integer number of students are possible"

            while True:
                try:
                    instructorCount = int( raw_input( "Enter number of instructors in the school: " ) )
                    if instructorCount < 0:
                        print "Honestly I don\'t have any jokes here."
                    else:
                        break
                except ValueError, e:
                    print "Only integer number of instructors are possible"

            while True:
                try:
                    classMin = int( raw_input( "Enter smallest possible class size: " ) )
                    if classMin < 0:
                        print "So if there is a negative number of students, does the school pay them? (No negatives)"
                    else:
                        break
                except ValueError, e:
                    print "Only integer number of students are possible"

            while True:
                try:
                    classMax = int( raw_input( "Enter largest possible class size: " ) )
                    if classMax < classMin:
                        print "The class has a min of", classMin, "you can\'t have a smaller max"
                    else:
                        break
                except ValueError, e:
                    print "Only integer number of students are possible"
    

    school = _school.School( ipeds, name )

    for item in range( courseCount ):
        school.add( rand.Course() )
    for item in range( studentCount ):
        school.add( rand.Student() )
    for item in range( instructorCount ):
        school.add( rand.Instructor() )


    students = school.students.values()
    weights = list( _types.Weight.LIST )
    for course in school.courses.values():
        course.add( random.choice( school.instructors.values() ) )

        classSize = random.randint( min( classMin, len( students ) ), min( classMax, len( students ) ) )
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

    ofile.write( school.json( indent = 2 ) )
    ofile.close()
#    print "{", "\"" + school.ipeds + "\"", ":", school.json( indent = 2 ), "}"
