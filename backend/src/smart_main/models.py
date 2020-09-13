# Defines database model
#
#

from django.db import models
from django.urls import reverse
import uuid

# CAUSES
class Cause(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ca_name = models.CharField(max_length=200)
    ca_desc = models.TextField(blank=True)
    ca_hi = models.CharField(max_length=50)

# EFFECT
class Effect(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ef_name = models.CharField(max_length=200)
    ef_desc = models.TextField(blank=True)
    ef_hi = models.CharField(max_length=50)

# CAUSE CONTROL
class CauseControl(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    caco_name = models.CharField(max_length=200)
    caco_desc = models.TextField(blank=True)
    caco_state = models.CharField(max_length=50)
    caco_type = models.CharField(blank=True, max_length=50)
    caco_ca = models.CharField(max_length=50)

# EFFECT CONTROL
class EffectControl(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    efco_name = models.CharField(max_length=200)
    efco_desc = models.TextField(blank=True)
    efco_state = models.CharField(max_length=50)
    efco_type = models.CharField(blank=True, max_length=50)
    efco_ef = models.CharField(max_length=50)

# REPORT
class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    re_name = models.CharField(max_length=200)
    re_desc = models.TextField(blank=True)
    re_crm = models.TextField(blank=True)
    re_ss = models.TextField(blank=True)
    re_qa = models.TextField(blank=True)
    re_cm = models.TextField(blank=True)

# RISK MATRIX DEFINATION
class RiskMatrix(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    value = models.CharField(max_length=20)
    user = models.CharField(max_length=50, blank=True)

# PROCESS NODE <=> SYSTEM FUNCTION
class ProcessNode_SystemFunction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    pn = models.CharField(max_length=50)
    sf = models.CharField(max_length=50)

# PROCESS NODE <=> HAZARD INSTANCE
class ProcessNode_HazardInstance(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    pn = models.CharField(max_length=50)
    hi = models.CharField(max_length=50)

# CARE PROCESS EDGE
class ProcessEdge(models.Model):
    # ht = Hazard Type
    id = models.CharField(primary_key=True, max_length=50)

    label = models.CharField(max_length=100, blank=True)
    source = models.CharField(max_length=50)
    target = models.CharField(max_length=50)
    pe_desc = models.TextField(blank=True)
    pe_ps = models.CharField(max_length=50, blank=True)

# CARE PROCESS NODE
class ProcessNode(models.Model):
    # ht = Hazard Type
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    id = models.CharField(max_length=50, primary_key=True)
    label = models.CharField(max_length=100, blank=True)
    pn_desc = models.TextField(blank=True)
    x = models.CharField(max_length=50)
    y = models.CharField(max_length=50)

    color = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    shape = models.CharField(max_length=50)

    pn_cs = models.CharField(max_length=50, blank=True)
    pn_ps = models.CharField(max_length=50, blank=True)

    parent = models.CharField(max_length=50, blank=True)

# PROCESS NODE GROUP
class NodeGroup(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    label = models.CharField(max_length=200, blank=True)
    x = models.CharField(max_length=50, blank=True)
    y = models.CharField(max_length=50, blank=True)
    ng_ps = models.CharField(max_length=50, blank=True)

# CARE PROCESS SYSTEM
class ProcessSystem(models.Model):
    # ht = Hazard Type
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    ps_name = models.CharField(max_length=200)
    ps_desc = models.TextField(blank=True)

# HAZARD TYPE
class HazardType(models.Model):
    # ht = Hazard Type
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    ht_name = models.CharField(max_length=200)
    ht_desc = models.TextField(blank=True)

# HAZARD INSTANCE
class HazardInstance(models.Model):
    # hi = Hazard Instance
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    hi_name = models.CharField(max_length=200)
    hi_desc = models.TextField(blank=True)

    # Initial Severity
    hi_inse = models.PositiveIntegerField(default=1)
    # Initial Likelihood
    hi_inli = models.PositiveIntegerField(default=1)
    # Residual Severity
    hi_rese = models.PositiveIntegerField(default=1)
    # Residual Likelihood
    hi_reli = models.PositiveIntegerField(default=1)
    # Initial Risk Rating
    hi_inrr = models.PositiveIntegerField(default=1)
    # Residual Risk Rating
    hi_rerr = models.PositiveIntegerField(default=1)

    # Clinical Justification
    hi_clju = models.TextField(blank=True, null=True)

    # Associated Hazard Type
    hi_parent = models.CharField(max_length=50, blank=True, null=True)

    # Associated Process Step
    hi_ps = models.CharField(max_length=50, blank=True, null=True)

    # Associated System Function
    hi_sf = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        ordering = ["hi_name"]

    def _str_(self):
        return str(self.hi_name)

# SYSTEM MODEL
class SystemModel(models.Model):
    # sy = System
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    sy_name = models.CharField(max_length=200)
    sy_desc = models.TextField(blank=True)

    class Meta:
        ordering = ["sy_name"]

    def _str_(self):
        return str(self.sy_name)


# SYSTEM FUNCTION MODEL
class SystemFunction(models.Model):
    # sf = System Function
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    sf_name = models.CharField(max_length=200)

    # Associated System
    sf_parent = models.CharField(max_length=50, blank=True)

    sf_desc = models.TextField(blank=True)

    class Meta:
        ordering = ["id"]

    def _str_(self):
        return str(self.sf_name)


# ISSUE LOG MODEL
class IssueLog(models.Model):
    # il = Issue Log
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    il_name = models.CharField(max_length=200)
    il_desc = models.TextField(blank=True)

    class Meta:
        ordering = ["il_name"]

    def _str_(self):
        return str(self.il_name)

# CARE SETTINGS MODEL
################################################
class CareSetting(models.Model):
    # cs = Care Setting
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    cs_name = models.CharField(max_length=200)
    cs_desc = models.TextField(blank=True)

    class Meta:
        ordering = ["cs_name"]

    def _str_(self):
        return str(self.cs_name)
