const Organization = require("../models/Organization");
const Branch = require("../models/Branch");
const User = require("../models/User");
const SubscriptionPlan = require("../models/SubscriptionPlan");
const OrganizationSubscription = require("../models/OrganizationSubscription");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create Organization
exports.createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);

    res.json({
      success: true,
      organization,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get All Organizations (Cloud Dashboard)
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .populate("ownerUserId", "name email")
      .sort({ createdAt: -1 });

    const data = await Promise.all(
      organizations.map(async (org) => {

        const branches = await Branch.countDocuments({
          organizationId: org._id,
        });

        const users = await User.countDocuments({
          organizationId: org._id,
        });

        const subscription =
          await OrganizationSubscription.findOne({
            organizationId: org._id,
          }).populate("planId", "name");

        return {
          ...org.toObject(),
          branches,
          users,
          subscription,
        };
      })
    );

    res.json({
      success: true,
      organizations: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Register Organization (SaaS Onboarding)
exports.registerOrganization = async (req, res) => {
  try {
    const {
      organizationName,
      slug,
      email,
      password,
      ownerName,
      phone,
      address,
      city,
      state,
      country,
    } = req.body;

    // Check duplicate organization slug
    const existingOrg = await Organization.findOne({ slug });

    if (existingOrg) {
      return res.status(400).json({
        success: false,
        message: "Organization slug already exists",
      });
    }

    // Check duplicate user email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create organization
    const organization = await Organization.create({
      name: organizationName,
      slug,
      email,
      phone,
      address,
      city,
      state,
      country,
      status: "trial",
    });

    // Create default branch
    const branch = await Branch.create({
      organizationId: organization._id,
      name: "Main Branch",
      address,
      city,
      state,
      country,
      phone,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create owner user
    const owner = await User.create({
      name: ownerName,
      email,
      password: hashedPassword,
      role: "ORG_OWNER",
      organizationId: organization._id,
      branchId: branch._id,
    });

    // Update owner reference
    organization.ownerUserId = owner._id;
    await organization.save();

    // Find the default Free plan
const freePlan = await SubscriptionPlan.findOne({
  name: "Free",
  active: true,
});

if (!freePlan) {
  throw new Error("Default subscription plan not found.");
}

// Calculate trial dates
const startsAt = new Date();

const trialEndsAt = new Date();
trialEndsAt.setDate(trialEndsAt.getDate() + freePlan.trialDays);

// Create subscription
const subscription = await OrganizationSubscription.create({
  organizationId: organization._id,
  planId: freePlan._id,
  status: "trial",
  startsAt,
  trialEndsAt,
  expiresAt: trialEndsAt,
});

    // JWT
    const token = jwt.sign(
      {
        id: owner._id,
        role: owner.role,
        gymId: null,
        organizationId: organization._id,
        branchId: branch._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

const ownerResponse = owner.toObject();
delete ownerResponse.password;

res.json({
  success: true,
  token,
  organization,
  branch,
  owner: ownerResponse,
  subscription,
});

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get Single Organization Details
exports.getOrganizationDetails = async (req, res) => {
  try {

const organization = await Organization.findById(req.params.id)
  .populate("ownerUserId", "name email role")
  .lean();

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.json({
      success: true,
      organization,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
