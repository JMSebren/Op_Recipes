package com.sebrenprojects.oprecipes.repo;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@SelectPackages("com.sebrenprojects.oprecipes.repo")
@SelectClasses({ IngredientRepositoryTest.class, UserRepositoryTest.class })

@Suite
public class RepoTestSuite {
	
	
}
