package com.management.library.util;

/**
 * Helper class to verify package loading
 */
public class PackageHelper {
    public static String getPackageName() {
        return PackageHelper.class.getPackage().getName();
    }
} 